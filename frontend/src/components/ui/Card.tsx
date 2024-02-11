import { ReactNode } from 'react'

interface CardHeaderProps {
    children?: ReactNode
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
    return <div className="flex flex-col space-y-1.5 p-6">{children}</div>
}

interface CardTitleProps {
    children?: ReactNode
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
    return <h3 className="font-semibold tracking-tight text-xl">{children}</h3>
}

interface CardDescriptionProps {
    children?: ReactNode
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children }) => {
    return <p className="text-sm">{children}</p>
}

interface CardContentProps {
    children?: ReactNode
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
    return (
        <div className="flex flex-col p-6 pt-0">
            <div className="flex flex-col space-y-4">{children}</div>
        </div>
    )
}

interface CardProps {
    children?: ReactNode
    className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div
            className={`flex flex-col rounded-lg border shadow-sm w-full max-w-md bg-white ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
export { CardHeader, CardTitle, CardDescription, CardContent }
