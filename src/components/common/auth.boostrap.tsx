import { useEffect } from 'react'
import { getMeApi } from '../../features/auth/api/auth.api'
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
                if (mounted) setUser(meResponse.data)
            } catch {
                if (mounted) setUser(null)
            } finally {
                if (mounted) setBootstrapping(false)
            }
        }

        bootstrap()

        return () => { mounted = false }
    }, [setUser, setBootstrapping])

    return <>{children}</>
}