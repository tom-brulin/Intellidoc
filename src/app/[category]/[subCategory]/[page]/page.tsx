import Header from "../../../(components)/Header"

type Props = {
    params: {
        category: string
        subCategory: string
        page: string
    }
}

export default function Page({ params }: Props) {
    return (
        <>
            <Header category={params.category} subCategory={params.subCategory} page={params.page} />

            {params.category}
        </>
    )
}