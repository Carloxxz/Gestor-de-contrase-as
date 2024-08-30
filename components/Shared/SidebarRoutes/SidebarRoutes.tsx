"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BarChart, DoorClosed, House, RectangleEllipsis } from "lucide-react"
import Link from "next/link"
import SingleItem from "../SingleItem/SingleItem"
import { dataSidebarConfiguration, dataSidebarElements } from "./SidebarRoutes.data"


export default function SidebarRoutes() {
    return (
        <div>
            <SingleItem href="/" label="HomePage" icon={House} />

            {dataSidebarElements.map(({ title, icon: Icon, children }) => (
                <Accordion type="single" collapsible key={title} className="w-full px-2">
                    <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger>
                            <div className="flex gap-2 items-center">
                                <div className="bg-blue-100/20 p-2 rounded-md">
                                    <Icon size={20} />
                                </div>
                                {title}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {children.map(({ href, icon: Icon, item }) => (
                                <div key={item}>
                                    <Link href={href}
                                        className="px-6 py-2 flex gap-2 items-center 
                                        hover:bg-blue-100/20 duration-300 transition-all rounded-md"
                                    >
                                        <Icon size={20} />
                                        {item}
                                    </Link>
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </ Accordion>
            ))}

            <SingleItem
                href="/generator"
                label="Generator"
                icon={RectangleEllipsis}
            />


            {dataSidebarConfiguration.map(({ title, icon: Icon, children }) => (
                <Accordion type="single" collapsible key={title} className="w-full px-2">
                    <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger>
                            <div className="flex gap-2 items-center">
                                <div className="bg-blue-100/20 p-2 rounded-md">
                                    <Icon size={20} />
                                </div>
                                {title}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {children.map(({ href, icon: Icon, item, premium }) => (
                                <div key={item}
                                    className="flex items-center justify-between mt-2 pr-1
                                    hover:bg-blue-100/20 duration-300 transition-all rounded-md"
                                >
                                    <Link
                                        href={href}
                                        className="px-6 py-2 flex gap-2 items-center"
                                    >
                                        <Icon size={20} />
                                        {item}
                                    </Link>
                                    {premium && (
                                        <span className="flex gap-2 text-xs px-2 py-1 bg-blue-400 rounded-md">
                                            Premium
                                        </span>
                                    )

                                    }
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </ Accordion>
            ))}

            <SingleItem href="/analytic" label="Analytics" icon={BarChart} />
            <SingleItem
                href="#"
                label="Close session"
                icon={DoorClosed}
                onClick={() => console.log("close")} />
        </div>
    )
}