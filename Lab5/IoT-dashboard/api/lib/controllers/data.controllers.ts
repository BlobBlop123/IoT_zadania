import { number } from 'joi';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];
class DataController implements Controller {
   public path = '/api/data';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
       this.router.get(`${this.path}/:id`, this.setid);
       this.router.post(`${this.path}/:id`, this.addData);
       this.router.get(`${this.path}/:id/latest`, this.biggest);
       this.router.get(`${this.path}/:id/:num`, this.range);
       this.router.delete(`${this.path}/all`, this.delAll);
       this.router.delete(`${this.path}/:id`, this.delSpec);

   }
   private range=async(request: Request, response: Response, next: NextFunction)=>{
    const {id,num} = request.params;
    const a=parseInt(id);
    const b=parseInt(num);
    if(!Number.isNaN(a)&&!Number.isNaN(b)){
        const wyn=testArr.slice(a,b)
        response.status(200).json(wyn);
    }else{
        response.status(200).json("Zła wartość");
    }

}
   private setid=async(request: Request, response: Response, next: NextFunction)=>{
    const {id} = request.params;
    const a=parseInt(id);
    if(!Number.isNaN(a)){
        response.status(200).json(testArr[a]);
    }else{
        response.status(200).json("Zła wartość");
    }

}
    private getLatestReadingsFromAllDevices=async(request: Request, response: Response, next: NextFunction)=>{
        const data=testArr;
        const last=data.length;
        response.status(200).json(data[last-1]);
    }
    private addData=async (request: Request, response: Response, next: NextFunction) => {
        const {id} = request.params;
        const a=parseInt(id);
        let data=testArr;
        if(!Number.isNaN(a)){ 
            data.push(a); 
        }
        response.status(200).json(data);
    }
    private biggest=async(request: Request, response: Response, next: NextFunction)=>{
        const data=testArr;
        const max=Math.max(...data);
        response.status(200).json("Największa wartość: "+max);
    }
    private delAll=async(request: Request, response: Response, next: NextFunction)=>{
        testArr=[];
        response.status(200).json("Dane usunięte");
    }
    private delSpec=async(request: Request, response: Response, next: NextFunction)=>{
        const {id} = request.params;
        const a=parseInt(id);
        if(!Number.isNaN(a)){
            const del=testArr[a]
            testArr.splice(a,1)
            response.status(200).json("Usunięto wartość: "+del);
        }else{
            response.status(200).json("Zła wartość");
        }

    }
}

export default DataController;