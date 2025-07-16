"use client";

import { useLayoutEffect, useState } from "react";
import HumeLogo from "./logos/Hume";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Github from "./logos/GitHub";
import pkg from '@/package.json';
import { useRouter } from 'next/navigation';


export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter()

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={
        "px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border"
      }
    >
      <div>
        <HumeLogo className={"h-5 w-auto"} />
      </div>
      <div className={"ml-auto flex items-center gap-1"}>
        <Button style={{backgroundColor:"#728f35"}} onClick={()=>{router.push("/cliente")}}>
          Clientes
        </Button>
        <Button style={{backgroundColor:"#728f35"}} onClick={()=>{router.push("/contrato")}}>
          Contratos
        </Button>
        <Button style={{backgroundColor:"#728f35"}} onClick={()=>{router.push("/amortizacion")}}>
          Amortizaciones
        </Button>
        <Button style={{backgroundColor:"#728f35"}} onClick={()=>{router.push("/resumen")}}>
          Resumen
        </Button>
        <Button style={{backgroundColor:"#728f35"}} onClick={()=>{router.push("/saldos")}}>
          Saldos
        </Button>
        <Button style={{backgroundColor:"#728f35"}} onClick={()=>{router.push("/solicitud")}}>
          Solicitud Pago
        </Button>
        {/* <Button
          onClick={() => {
            window.open(
              pkg.homepage,
              "_blank",
              "noopener noreferrer"
            );
          }}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            <Github className={"size-4"} />
          </span>
          <span>Star on GitHub</span>
        </Button>
        <Button
          onClick={toggleDark}
          variant={"ghost"}
          className={"ml-auto flex items-center gap-1.5"}
        >
          <span>
            {isDarkMode ? (
              <Sun className={"size-4"} />
            ) : (
              <Moon className={"size-4"} />
            )}
          </span>
          <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
        </Button> */}
      </div>
    </div>
  );
};
