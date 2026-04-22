import { useEffect } from 'react'
import { getMeApi, refreshApi } from '../../features/auth/api/auth.api'
import { useAuthStore } from '../../features/auth/store/auth-store'

type Props = {
    children: React.ReactNode
}

export function AuthBootstrap({ children }: Props) {
    const setUser = useAuthStore((state) => state.setUser)
    const setBootstrapping = useAuthStore((state) => state.setBootstrapping)

    useEffect(() => {
        let mounted = true

        async function bootstrap() {
            try {
                const meResponse = await getMeApi()
                if (!mounted) return
                setUser(meResponse.data)
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    try {
                        await refreshApi()
                        const meResponse = await getMeApi()
                        if (!mounted) return
                        setUser(meResponse.data)
                    } catch {
                        if (!mounted) return
                        setUser(null)
                    }
                } else {
                    if (!mounted) return
                    setUser(null)
                }
            }
            if (!mounted) return
            setBootstrapping(false)
        }

        bootstrap()

        return () => {
            mounted = false
        }
    }, [setUser, setBootstrapping])

    return <>{children}</>
}