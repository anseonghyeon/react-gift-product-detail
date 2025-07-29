
import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import ProductBanner from "@/components/Product/ProductBanner";
import { Spinner } from "@/components/Spinner";

import { Suspense } from "react";

import { useLocation } from "react-router-dom";


function Product() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    return (
        <Layout>
            <NavBar></NavBar>
            <Suspense fallback={<Spinner />}>
                <ProductBanner id={id}></ProductBanner>
            </Suspense>
            
        </Layout>
    )
}

export default Product;