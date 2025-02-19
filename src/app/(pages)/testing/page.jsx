'use client'
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

    return (
        <div>
            <Button
            onPress={() => {TestingMethod();}}
        > !!TEST!! </Button>
        </div>
    );
}

export default TestingPage;