const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://grey-woodcock-759599.hostingersite.com/graphql";

/**
 * Fungsi asas untuk menghantar GraphQL Query ke WordPress WooCommerce
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }, // Cache data selama 60 saat (Incremental Static Regeneration)
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Network or Fetch Error:", error);
    return null;
  }
}

/**
 * Mengambil senarai produk dari WooCommerce
 */
export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 20) {
        nodes {
          id
          databaseId
          name
          slug
          description
          shortDescription
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
          }
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ products: { nodes: unknown[] } }>(query);
  return data?.products?.nodes || [];
}

/**
 * Mengambil maklumat terperinci produk mengikut slug
 */
export async function getProductBySlug(slug: string) {
  const query = `
    query GetProductBySlug($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        id
        databaseId
        name
        slug
        description
        shortDescription
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
        image {
          sourceUrl
          altText
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ product: unknown }>(query, { slug });
  return data?.product || null;
}