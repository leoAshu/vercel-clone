import { useCallback, useMemo, useState } from 'react'
import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/Card'

const Landing = () => {
    const [repoURL, setRepoURL] = useState('')
    const [uploadId, setUploadId] = useState('')
    const [uploading, setUploading] = useState(false)
    const [deployed, setDeployed] = useState(false)

    const upload = useCallback(async () => {
        if (!repoURL) {
            // Display error message for empty repository URL
            alert('Please enter a GitHub repository URL.')
            return
        }

        const githubRepoRegex = /^https?:\/\/github.com\/\S+\/\S+$/
        if (!githubRepoRegex.test(repoURL)) {
            // Display error message for invalid GitHub repository URL format
            alert('Please enter a valid GitHub repository URL.')
            return
        }

        setUploading(true)

        await new Promise((resolve) => setTimeout(resolve, 10000))

        setUploadId('testID')
        setUploading(false)

        await new Promise((resolve) => setTimeout(resolve, 10000))

        setDeployed(true)
    }, [repoURL])

    const isDisabled = useMemo(() => {
        return uploadId !== '' || uploading
    }, [uploadId, uploading])

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Deploy your GitHub Repository</CardTitle>

                    <CardDescription>
                        Enter the URL of your GitHub repository to deploy it
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col space-y-2">
                        <label
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="github-url"
                        >
                            GitHub Repository URL
                        </label>

                        <input
                            type="url"
                            id="github-url"
                            value={repoURL}
                            disabled={isDisabled}
                            placeholder="https://github.com/username/repo"
                            onChange={(e) => setRepoURL(e.target.value)}
                            className="h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-black focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <button
                        onClick={upload}
                        disabled={isDisabled}
                        className="rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-black focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black h-10 py-2 text-white"
                    >
                        Upload
                    </button>
                </CardContent>
            </Card>

            {deployed && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Deployment Status</CardTitle>

                        <CardDescription>
                            Your website is successfully deployed!
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col space-y-2">
                            <label
                                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="deployed-url"
                            >
                                Deployed URL
                            </label>

                            <input
                                readOnly
                                type="url"
                                id="deployed-url"
                                value={`http://${uploadId}.vercel-clone.com:3001/`}
                                className="h-10 w-full rounded-md border px-3 py-2 text-sm"
                            />
                        </div>

                        <button className="rounded-md border text-sm font-medium bg-white h-10 py-2 text-black">
                            Visit Website
                        </button>
                    </CardContent>
                </Card>
            )}
        </main>
    )
}

export default Landing
