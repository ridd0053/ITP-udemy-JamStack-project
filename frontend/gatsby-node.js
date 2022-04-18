exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
     {
      products: allStrapiProduct {
        edges {
          node {
            name
            strapiId
            description
            category {
              name
            }
            variants {
              id
              color
              size
              style
              price
              images {
                url
              }
            }
          }
        }
      }
      categories: allStrapiCategory(filter: {}) {
        edges {
          node {
            strapiId
            name
            description
            filterOptions {
              Size {
                label
                checked
              }
              Style {
                label
                checked
              }
              Color {
                label
                checked
              }
            }
          }
        }
      }
    } 
    `
    )

    if(result.error) {
      throw result.errors
    }
    const products = result.data.products.edges
    const categories = result.data.categories.edges

    products.forEach(product => {
      createPage({
        path: `/${product.node.category.name.toLowerCase()}/${
          product.node.name.split(" ")[0]
        }`,
        component: require.resolve("./src/templates/product-detail.js"),
        context: {
          name: product.node.name,
          category: product.node.category.name,
          id: product.node.strapiId,
          description: product.node.description,
          variants: product.node.variants,
          product: product,
        },
      })
    });
    categories.forEach(category => {
      createPage({
        path: `/${category.node.name.toLowerCase()}`,
        component: require.resolve("./src/templates/product-list.js"),
        context: {
          name: category.node.name,
          description: category.node.description,
          id: category.node.strapiId,
          filterOptions: category.node.filterOptions
        },
      })
    });
}
