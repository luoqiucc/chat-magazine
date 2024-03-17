import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function BannerCarousel() {
    return (
        <section className="py-12">
            <Carousel orientation="vertical" opts={{}}>
                <CarouselContent className="h-[200px]">
                    <CarouselItem>
                        <Card className="h-full p-4">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                自定义内容
                            </h3>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="h-full p-4">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                自定义内容
                            </h3>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="h-full p-4">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                自定义内容
                            </h3>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}