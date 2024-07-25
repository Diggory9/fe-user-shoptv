import Image from "next/image";
import Link from "next/link";

export default function Category() {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <div className="relative overflow-hidden">
                        <Link href="/product">
                            <Image
                                src="/img/category/sofa.jpg"
                                alt="Sofa"
                                width={700}
                                height={300}
                                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 text-white font-bold">
                                SOFA
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative overflow-hidden">
                            <Link href="/product">
                                <Image
                                    src="/img/category/banan.jpg"
                                    alt="Bàn ăn"
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 text-white font-bold">
                                    BÀN ĂN
                                </div>
                            </Link>
                        </div>
                        <div className="relative overflow-hidden">
                            <Link href="/product">
                                <Image
                                    src="/img/category/giuong.jpg"
                                    alt="Bàn ăn"
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 text-white font-bold">
                                    BÀN ĂN
                                </div>
                            </Link>
                        </div>
                        <div className="relative overflow-hidden">
                            <Link href="/product">
                                <Image
                                    src="/img/category/armchair.jpg"
                                    alt="Armchair"
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 text-white font-bold">
                                    ARMCHAIR
                                </div>
                            </Link>
                        </div>
                        <div className="relative overflow-hidden">
                            <Link href="/product">
                                <Image
                                    src="/img/category/ghean.jpg"
                                    alt="Ghế ăn"
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 text-white font-bold">
                                    GHẾ ĂN
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
