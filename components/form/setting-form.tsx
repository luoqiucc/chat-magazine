"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { updateSettingsAction } from '@/lib/action/setting'

const FormSchema = z.object({
    value: z.boolean(),
    uid: z.string(),
})

interface Settings {
    uid: string
    value: boolean
    title: string,
    description: string
}
export default function SettingForm({ value, uid, title, description }: Settings) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            value,
            uid,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData()
        formData.append('uid', data.uid)
        formData.append('value', data.value ? '1' : '0')
        await updateSettingsAction(formData)
    }

    return (
        <Form {...form}>
            <form onChange={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between py-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    {title}
                                </FormLabel>
                                <FormDescription>
                                    {description}
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
