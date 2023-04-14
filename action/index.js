
import axios from "axios";

async function  run()
{
    const response = await axios.get('https://www.boredapi.com/api/activity');
    console.log(response);
}

run();
