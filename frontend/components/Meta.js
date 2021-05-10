import Head from 'next/head'

const Meta = ({ title, keyword, description }) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            {/* <meta name='keywords' content={keyword} />
            <meta name='description' content={description} /> */}
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Amiba',
    // keywords: 'web development, programing',
    // description: 'Get the latest news in web dev'
}

export default Meta
