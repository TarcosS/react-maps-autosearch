export type Place = {
    name: string
    formattedName: string
    lat: number
    lng: number
}

export type MapSearchInputProps = {
    ApiKey?: string
    placeholder?: string
    onChange?: (place: Place | null) => void
    loader?: React.ReactNode
    searchSize?: number
    
    className?: string
    classNames?: {
        input?: string
        list?: string
        listItem?: string
        listItemActive?: string,
        mapWrapper?: string
    },
    style?: React.CSSProperties
    styles?: {
        input?: React.CSSProperties
        list?: React.CSSProperties
        listItem?: React.CSSProperties
        listItemActive?: React.CSSProperties,
        mapWrapper?: React.CSSProperties
    }
    enablePreview?: boolean
    enablePreviewRelative?: boolean,
    provider?: ProviderType,
    searcher?: SearcherType
}

export type MapProps = {
    center: google.maps.LatLngLiteral,
}

export type ProviderType = {
    url: string
    needKey: boolean
    attribution: string
}

export type SearcherType = {
    name: string
    search: (text: string, searchSize: number, ApiKey?: string) => Promise<Place[]>
}