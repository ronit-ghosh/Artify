import { app } from ".";
// import os from "os"
// import cluster from "cluster";

// const totalCpus = os.cpus().length

// if (cluster.isPrimary) {
//     console.log(`Totals cores: ${totalCpus}`)
//     console.log(`Process ID: ${process.pid}`)
//     for (let i = 1; i < totalCpus; i++) {
//         cluster.fork()
//         console.log(`Cpu no: ${i}`)
//     }
// } else {
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
// }