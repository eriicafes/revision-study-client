import { createContext, ReactNode, useContext } from 'react'

const publicEnv = {
    githubRepoUrl: process.env.GITHUB_REPO_URL
} as const

const ConfigContext = createContext(publicEnv)

export const ConfigProvider = ({ children }: { children: ReactNode }) => (
    <ConfigContext.Provider value={publicEnv}>{children}</ConfigContext.Provider>
)

export const useConfig = () => useContext(ConfigContext)