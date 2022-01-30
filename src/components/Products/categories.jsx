import React from 'react';
import { TShirt, FilmStrip, SoccerBall, Eyeglasses } from 'phosphor-react';
import { Icon } from '@chakra-ui/react';

const categories = [
    {
        id: 1,
        label: "Clothing and Store",
        icon: TShirt,
    },
    {
        id: 2,
        label: "Entertainment",
        icon: FilmStrip,
    },
    {
        id: 3,
        label: "Sports",
        icon: SoccerBall,
    },
    {
        id: 4,
        label: "Vintage",
        icon: Eyeglasses,
    },
];

function Categories({ selected = 1 }) {

    const getSelectedCategoryClass = (id) => {
        const classesForSelectedCategory = (id === selected)? "bg-blue-50 rounded-t-lg border-b-2 border-b-blue-500 text-blue-600": "";
        return `cursor-pointer justify-self-center grid grid-rows-2 justify-items-center py-1 px-2 my-3 border-radius-md ${classesForSelectedCategory}`
    }

    return ( 
        <div className="my-2 grid grid-cols-4 justify-center">
            {categories.map(category => (
                <div className={getSelectedCategoryClass(category.id)} key={category.id}>
                    <Icon weight='bold' color={(category.id === selected?"blue.600":"gray.600")} as={category.icon} />
                    <span>{category.label}</span>
                </div>
            ))}
        </div>
     );
}

export default Categories;