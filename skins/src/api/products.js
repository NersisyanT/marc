import axios from 'axios';
export default class Products { 

    constructor() {
    }

    getTodoItems = async () => {
        const BASE_URL = '/ajax.php';
        var products;

        axios.get(`${BASE_URL}`).then(response => {
            products = response.data;
        });
        console.log(products);
        return products;
    };

    // getTodoItems = async () => {
    //     const BASE_URL = '/ajax.php';
    //     try {
    //         const response = await axios.get(`${BASE_URL}`);

    //         const todoItems = response.data; 

    //         console.log(todoItems)
    //         return todoItems;
    //     } catch (errors) {
    //         console.error(errors);
    //     }
    // };
}