import {Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, 
    Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";


function generateData(a, b, c, min, max, step, variability){
        const xValues = [];
        const yValues = [];
        for(let x = min; x < max; x+=step){
            xValues.push(x);
            yValues.push((a * x * x + b * x + c + Math.random() * variability * 500)/b);
        }
        return {xValues, yValues};

}


const {xValues, yValues} = generateData(-1, 500, 0, 0, 500, 10, 50) ;

export const Data = {
    labels: xValues,
    datasets: [{
        label: "Recorded Data",
        data: yValues,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        tension: 0.2
    }
    ]
};

export const Options = {
    responsive: true,
    plugins: {
        legend : {
            position: 'top'
        },
        title: {
            display: true,
            text: "Average Reaction Time",
        },
    },
};