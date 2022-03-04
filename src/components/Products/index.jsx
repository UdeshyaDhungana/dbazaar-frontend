import React, { useEffect, useState } from 'react';
import ProductsListing from './productsListing';
import { getProducts } from '../../services/productService';
import { useToast } from '@chakra-ui/react';
import { SmileySad } from 'phosphor-react';

export const productsList = [
    {
        id: 1,
        label: "Old Typewriter",
        price: 2000.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        bids: [
            {
                id: 1,
                price: 1000,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisl luctus, tincidunt mi nec, maximus leo.",
                posted_by: {
                    id: 2,
                    name: "Suraj Nepali"
                }
            },
            {
                id: 2,
                price: 1500,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisl luctus, tincidunt mi nec, maximus leo.",
                posted_by: {
                    id: 3,
                    name: "Alex Nepali"
                }
            },
            {
                id: 3,
                price: 1200,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget nisl luctus, tincidunt mi nec, maximus leo.",
                posted_by: {
                    id: 5,
                    name: "Your Dad"
                }
            },
        ],
        category: {
            id: 3,
            label: "Others",
        },
    },
    {
        id: 2,
        label: "Goldstar shoes",
        price: 3000.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 4.0,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        category: {
            id: 3,
            label: "Others",
        },
        bids: []
    },
    {
        id: 3,
        label: "Kitten",
        price: 2000.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 3.0,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        category: {
            id: 2,
            label: "Books",
        },
        bids: []
    },
    {
        id: 4,
        label: "Plant pot",
        price: 200.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 5.0,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        category: {
            id: 2,
            label: "Books",
        },
        bids: []
    },
    {
        id: 5,
        label: "Lotion",
        price: 500.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 5.0,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        category: {
            id: 1,
            label: "Electronics",
        },
        bids: []
    },
    {
        id: 6,
        label: "Bonsai Tree",
        price: 20000.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 2.0,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        category: {
            id: 4,
            label: "Tools",
        },
        bids: []
    },
    {
        id: 7,
        label: "Makeup Brush",
        price: 800.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 4.2,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        category: {
            id: 3,
            label: "Other",
        },
        bids: []
    },
    {
        id: 8,
        label: "Pencils",
        price: 120,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 4.5,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
        },
        category: {
            id: 2,
            label: "Books",
        },
        bids: []
    }
]

function Products() {
    const [products, setProducts] = useState([]);
    const toast = useToast();
    // const [filters, setFilters] = useState({});

    // const applyFilter = (filters) => {
    //     setFilters(filters);
    //     console.log(filters);
    // }

    useEffect(() => {
        getProducts()
            .then(({ data: { results } }) => {
                setProducts(results);
            }).catch(_ => {
                toast({
                    title: "Error",
                    description: "Error occured while fetching categories",
                    duration: 4000,
                    status: "error",
                    isClosable: false,
                })
            })
    }, [toast])

    return (
        <div>
            {/* <Filters applyFilter={applyFilter} /> */}
            {products.length > 0 ? <ProductsListing
                products={products}
            />
                :
                <div className='grid justify-center'>
                    <div className='justify-self-center'>
                        <SmileySad display={'block'} className='' size={64} />
                    </div>
                    <div className='align-center' >No products found!</div>
                </div>
            }
        </div>
        // </div>
    );
}

export default Products;