export interface Character {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: Thumbnail
  resourceURI: string
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: Url[]
}

export interface Thumbnail {
  path: string
  extension: string
}

export interface Comics {
  available: number
  collectionURI: string
  items: ComicsItem[]
  returned: number
}

export interface ComicsItem {
  resourceURI: string
  name: string
}

export interface Series {
  available: number
  collectionURI: string
  items: SeriesItem[]
  returned: number
}

export interface SeriesItem {
  resourceURI: string
  name: string
}

export interface Stories {
  available: number
  collectionURI: string
  items: StoriesItem[]
  returned: number
}

export interface StoriesItem {
  resourceURI: string
  name: string
  type: string
}

export interface Events {
  available: number
  collectionURI: string
  items: EventsItem[]
  returned: number
}

export interface EventsItem {
  resourceURI: string
  name: string
}

export interface Url {
  type: string
  url: string
}

export interface Comic {
    id: number
    digitalId: number
    title: string
    issueNumber: number
    variantDescription: string
    description: string
    modified: string
    isbn: string
    upc: string
    diamondCode: string
    ean: string
    issn: string
    format: string
    pageCount: number
    textObjects: any[]
    resourceURI: string
    urls: Url[]
    series: Series
    variants: Variant[]
    collections: any[]
    collectedIssues: any[]
    dates: Date[]
    prices: Price[]
    thumbnail: Thumbnail
    images: Image[]
    creators: Creators
    characters: Characters
    stories: Stories
    events: Events
  }

  export interface Image {
    path:string;
    extension: string;
  }
  
  export interface Variant {
    resourceURI: string
    name: string
  }
  
  export interface Date {
    type: string
    date: string
  }
  
  export interface Price {
    type: string
    price: number
  }
  
  export interface Creators {
    available: number
    collectionURI: string
    items: CreatorsItem[]
    returned: number
  }
  
  export interface CreatorsItem {
    resourceURI: string
    name: string
    role: string
  }
  
  export interface Characters {
    available: number
    collectionURI: string
    items: any[]
    returned: number
  }
  