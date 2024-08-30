"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { formSchema } from "./FormAddElement.form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Copy, Earth, Eye, Shuffle } from "lucide-react"
import { copyClipboard } from "@/lib/copyClipboard"
import { useState } from "react"
import { generatePassword } from "@/lib/generatePassword"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"


export default function FormAddElement() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typeElement: "",
            isFavourite: false,
            name: "",
            directory: "",
            username: "",
            password: "",
            urlWebSite: "",
            notes: "",
            userId: ""
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post('/api/items', values)
            toast({ title: "Item creado" })
            form.reset({
                typeElement: "",
                isFavourite: false,
                name: "",
                directory: "",
                username: "",
                password: "",
                urlWebSite: "",
                notes: "",
                userId: ""
            })

            router.refresh()

        } catch (error) {
            toast({
                title: "Algo salío mal",
                variant: "destructive"
            })
            console.error(error)
        }
    }

    const generateRandomPassword = () => {
        const password = generatePassword()
        form.setValue("password", password)
    }

    const updateUrl = () => {
        form.setValue("urlWebSite", window.location.href)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 gap-y-2 gap-x-4 grid">
                    <FormField
                        control={form.control}
                        name="typeElement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Qué tipo de elemento necesitas?</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a directory for your password" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Inicio de sesión">Inicio de sesión</SelectItem>
                                        <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                                        <SelectItem value="Identidad">Identidad</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isFavourite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Quieres seleccionar tu contraseña como favorita?</FormLabel>
                                <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>Marcar como favorito</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="directory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Directorio</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Elige el directiorio" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Social">Social</SelectItem>
                                        <SelectItem value="Arts">Arts</SelectItem>
                                        <SelectItem value="Shopping">Shopping</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuario</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} />
                                        <Copy
                                            className="absolute top-3 right-4 cursor-pointer"
                                            size={18}
                                            onClick={() => copyClipboard(field.value)}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="urlWebSite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL Website</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} />
                                        <Earth
                                            className="absolute top-3 right-2 cursor-pointer"
                                            size={18}
                                            onClick={updateUrl}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between">
                                    Password
                                    <Shuffle className="cursor-pointer" size={15} onClick={generateRandomPassword} />
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} type={showPassword ? 'text' : 'password'} />
                                        <Eye
                                            className="absolute top-3 right-10 cursor-pointer"
                                            size={18}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                        <Copy className="absolute top-3 right-2 cursor-pointer"
                                            onClick={() => copyClipboard(field.value)}
                                            size={18}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div>
                        <div className="text-slate-400 flex items-center justify-between text-sm">
                            Autenticación TOTP
                            <p className="px-3 bg-green-700 text-white rounded-lg text-xs mr-5">Premium</p>
                        </div>
                        <Input disabled />
                    </div>

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}