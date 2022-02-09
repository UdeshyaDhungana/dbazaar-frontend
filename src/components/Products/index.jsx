import React, { useEffect, useState } from 'react';
import Filters from './filters';
import ProductsListing from './productsListing';

export const productsList = [
    {
        id: 1,
        label: "Old Typewriter",
        price: 2000.00,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis luctus nibh, ac molestie sem. Morbi sapien tellus, fringilla ut pretium non, condimentum eu leo. Morbi lobortis et tortor id aliquam. Proin quis scelerisque mi. Ut velit justo, vulputate fringilla placerat eget, malesuada nec lorem. Quisque vestibulum eros bibendum consequat laoreet. Ut lobortis, libero a condimentum ornare, mi arcu bibendum risus, eget gravida dolor risus vel lacus. Sed tempus interdum pretium. Quisque fringilla dui non lectus hendrerit feugiat. Etiam nibh lacus, tincidunt nec neque sit amet, blandit facilisis orci. Ut convallis eros a ipsum egestas pellentesque. Donec at nisi at leo pulvinar gravida. Integer egestas lacus vel nulla accumsan, et aliquam eros eleifend. Aliquam sit amet tempor velit. Nunc dapibus felis in ex egestas ornare. `,
        stars: 4.5,
        posted_by: {
            id: 1,
            name: "Udeshya Dhungana",
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
    }
]

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // to be replaced with api later
        setProducts(productsList);
    }, [])

    return (
        <div>
            <Filters />
            <ProductsListing
                products={products}
            />
        </div>
        // </div>
    );
}

export default Products;