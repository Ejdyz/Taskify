'use client'
import { getTaskInfo } from "@/lib/task/task";
import { Button } from "@heroui/button";

const TestingPage = () => {
    
    async function TestingMethod() {
        try {
            const response = await fetch("/api/task/get", {
              method: "POST",
              data: {},
              headers: {
                "Content-Type": "application/json"
              }
            });
            
            console.log(response.json());
    
          } catch (error) {
            console.log(error);
            
          }
    }

    async function GetInfo() {
      
      console.log(getTaskInfo(""));
    }

    return (
        <div>
            <Button
            onPress={() => {TestingMethod();}}
        > !!TEST!! </Button>
        <Button
            onPress={() => { GetInfo();}}
        > GetInfo() </Button>
        </div>
    );
}

export default TestingPage;