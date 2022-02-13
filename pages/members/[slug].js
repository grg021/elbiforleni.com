import { sanityClient, getClient } from '../../lib/sanity.server'
import {
    memberQuery,
    memberBySlugQuery,
    memberSlugsQuery
} from '../../lib/queries'
import {usePreviewSubscription} from '../../lib/sanity'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Header from '../../components/header'

const Member = ({ data = {}, preview }) => {

    const router = useRouter()

    const slug = data?.member?.slug

    const {
        data: { member },
    } = usePreviewSubscription(memberQuery, {
        params: { slug },
        initialData: data,
        enabled: preview && slug,
    })

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <Layout preview={preview}>
            <Container>
                <Header />
                {router.isFallback ? (
                    <div>Loading…</div>
                ) : (
                    <article className={'text-center'}>
                        <h1 className={'text-3xl font-medium'}>{member.name}</h1>
                        <span className={'text-xl text-gray-400'}>{member.barangay}</span>
                    </article>
                )}
            </Container>
        </Layout>

    )
}

export async function getStaticProps({ params, preview = false }) {
    const member = await getClient(preview).fetch(memberBySlugQuery, {
        slug: params.slug,
    })

    return {
        props: {
            preview,
            data: {
                member
            },
        },
    }
}

export async function getStaticPaths() {
    const paths = await sanityClient.fetch(memberSlugsQuery)
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    }
}

export default Member
