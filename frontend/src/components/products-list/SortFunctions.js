
export const alphabetic = (data, direction) =>  (
 data.sort((a, b) => {
        const first = a.node.name.toLowerCase()
        const second = b.node.name.toLowerCase()
        // desc Z-A asc A-Z
        const x = direction === "asc" ? first : second
        const y = direction === "asc" ? second : first
        // Reverse directions
        if(x <  y) return -1
        if(x >  y) return 1
        // when x and y are equal
        return 0
    })
)

export const time = (data, direction) => (
  data.sort((a,b) => {
        const first = new Date(a.node.createdAt)
        const second = new Date(b.node.createdAt)
        // Asc newest and desc oldest
        const x = direction === "asc" ? second : first
        const y = direction === "asc" ? first : second
        // Reverse directions
            if(x <  y) return -1
            if(x >  y) return 1
        // when x and y are equal
            return 0
    })
)

export const price = (data, direction) => (
  data.sort((a,b) => {
        const first = a.node.variants[0].price
        const second = b.node.variants[0].price
        // asc price up and desc price down
        const x = direction === "asc" ? second : first
        const y = direction === "asc" ? first : second
        // Reverse directions
            if(x <  y) return -1
            if(x >  y) return 1
        // when x and y are equal
            return 0
    })
)

export default function SortFunctions({ variant }) {


    return  (
        null
    )
}