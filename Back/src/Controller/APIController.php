<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Service\RickAndMortyGestion;
use App\Entity\Product;

#[Route('/api', name: 'api')]
class APIController extends AbstractController
{
    #[Route('/', name: 'api_home')]
    public function index(Request $request): Response
    {
        return $this->json(['message' => "Hello world"]);
    }

    #[Route('/products', name: 'api_products', methods: ['GET'])]
    public function products(Request $request, RickAndMortyGestion $rickAndMortyGestion): Response
    {
        return $this->json($rickAndMortyGestion->findAll());
    }

    #[Route('/products', name: 'api_product_add', methods: ['POST'])]
    public function addProduct(Request $request, RickAndMortyGestion $rickAndMortyGestion): Response
    {
        $data = json_decode($request->getContent(), true);
        return $this->json($rickAndMortyGestion->addProduct($data));
    }

    #[Route('/products/{product}', name: 'api_product', methods: ['GET'])]
    public function product(Request $request, Product $product ): Response
    {
        return $this->json($product);
    }

    #[Route('/products/{product}', name: 'api_product_delete', methods: ['DELETE'])]
    public function deleteProduct(Request $request, RickAndMortyGestion $rickAndMortyGestion, Product $product): Response
    {
        $rickAndMortyGestion->deleteProduct($product);
        return $this->json(['delete' => 'ok']);
    }

    #[Route('/cart', name: 'api_cart', methods: ['GET'])]
    public function cart(Request $request, RickAndMortyGestion $rickAndMortyGestion): Response
    {
        return $this->json($rickAndMortyGestion->findCart());
    }
    
    
    #[Route('/cart/{product}', name: 'api_cart_add_product', methods: ['POST'])]
    public function addProductToCart(Request $request, RickAndMortyGestion $rickAndMortyGestion, Product $product): Response
    {
        try{
            $data = json_decode($request->getContent(), true);
            $quantity = intval($data['quantity']);
            $cart = $rickAndMortyGestion->addProductToCart($product, $quantity);
            return $this->json($cart);
        }catch(\Exception $ex){
            return $this->json(["error" => "too many"]);
        }
    }

    #[Route('/cart/{product}', name: 'api_cart_delete_product', methods: ['DELETE'])]
    public function deleteProductToCart(Request $request, RickAndMortyGestion $rickAndMortyGestion, Product $product ): Response
    {
        $cart = $rickAndMortyGestion->deleteProductFromCart($product);
        return $this->json($cart);
    }

}
