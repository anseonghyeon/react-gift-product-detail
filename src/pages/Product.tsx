
import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import ProductBanner from "@/components/Product/ProductBanner";
import { Spinner } from "@/components/Spinner";

import { Suspense } from "react";

import { useLocation } from "react-router-dom";

import ErrorBoundary from "@/utils/ErrorBoundary";
import ProductMain from "@/components/Product/ProductMain";

import OrderBar from "@/components/Product/OrderBar";

function Product() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    return (
        <Layout>
            <NavBar/>
            <Suspense fallback={<Spinner />}>
                <ErrorBoundary fallback={<p>에러 발생</p>}>
                    <ProductBanner id={id}/>
                </ErrorBoundary>   
                <ProductMain id={id}/>
                <ErrorBoundary fallback={<p>에러 발생</p>}>
                    <OrderBar id={id}/>
                </ErrorBoundary> 
            </Suspense>
        </Layout>
    )
}

export default Product;