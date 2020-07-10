import path from 'path'
import api from '../services/api';


export async function getDealsData() {
    const response = await api.get('/r/gamedeals/new.json?limit=50');
    const { data } = response.data
    // extractFreeGames(data.children)
    // let readyData = extractStore(data.children)

    // console.log(readyData)
    return data.children;
}