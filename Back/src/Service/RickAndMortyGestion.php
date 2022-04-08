<?php

namespace App\Service;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProductRepository;
use App\Repository\CartRepository;

use App\Entity\Product;
use App\Entity\Cart;


class RickAndMortyGestion{
    /* @var ProductRepository */
    private ProductRepository $repository;
    private CartRepository $cartRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(ProductRepository $repository, CartRepository $cartRepository,
    EntityManagerInterface $entityManager){
        $this->repository = $repository;
        $this->cartRepository = $cartRepository;
        $this->entityManager = $entityManager;
    }

    public function findAll(){
        return $this->repository->findAll();
    }

    public function findCart(){
        return $this->cartRepository->findAll()[0];
    }

    public function findById(int $id){
        return $this->repository->findById($id);
    }

    public function addProduct($data){
        $product = new Product();
        $product->setName($data['name'])
        ->setPrice($data['price'])
        ->setQuantity(intval($data['quantity']))
        ->setImage($data['image']);
        $this->entityManager->persist($product);
        $this->entityManager->flush();
        return $product;
    }

    public function deleteProduct(Product $product){
        $this->entityManager->remove($product);
        $this->entityManager->flush();
        return true;
    }

    public function addProductToCart(Product $product, int $quantity){
        if($quantity > $product->getQuantity()){
            throw new \Exception("too quantity");
        }
        // @var Cart
        $carts = $this->cartRepository->findAll();
        if(!isset($carts[0])){
            $cart = new Cart();
        }else{
            $cart = $carts[0];
        }
        $cart->addProduct($product);
        $this->entityManager->persist($cart);
        $this->entityManager->flush();
        return $cart;
    }

    public function deleteProductFromCart(Product $product){
        $carts = $this->cartRepository->findAll();
        $cart = $carts[0];
        $cart->removeProduct($product);
        $this->entityManager->persist($cart);
        $this->entityManager->flush();
        return $cart;
    }
}