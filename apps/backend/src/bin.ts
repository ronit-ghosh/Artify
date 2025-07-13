import { app } from ".";
import { config } from "dotenv";
// import os from "os";
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
config({ path: "../../.env" });
const PORT = process.env.PORT || 8000;
console.log(PORT)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// }