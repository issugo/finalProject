<?php

namespace App\Tests;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{

    private $product;
    private $id;

    public function testApi(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testAddProduct()
    {
        //create a product
        $this->product = new Product();
        $this->product->setName("Rick");
        $this->product->setPrice(8);
        $this->product->setQuantity(20);
        $this->product->setImage("rick.png");

        //add product to db
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/products', [
            "name" => $this->product->getName(),
            "price" => $this->product->getPrice(),
            "quantity" => $this->product->getQuantity(),
            "image" => $this->product->getImage()
        ]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals("Rick", $responseData["name"]);
        $this->assertEquals(8, $responseData["price"]);
        $this->assertEquals(20, $responseData["quantity"]);
        $this->assertEquals("rick.png", $responseData["image"]);

        $id = $responseData["id"];
        return $id;
        
    }

    /**
    * @depends testAddProduct
    */
    public function testGetAllProductsAfterAddingOne($id): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(21, sizeof($responseData));
        $this->assertEquals("Rick", $responseData[$id - 1]["name"]);
    }

    /**
    * @depends testAddProduct
    */
    public function testGetOneProduct($id): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', "/api/products/{$id}");
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals("Rick", $responseData["name"]);
        $this->assertEquals(8, $responseData["price"]);
    }

    /**
    * @depends testAddProduct
    */
    public function testAddProductToCart($id): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', "/api/cart/{$id}", ["quantity" => "2"]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(1, sizeof($responseData["products"]));
        //$this->assertEquals(1, $responseData["products"][0]["quantity"]);
    }

    public function testCart(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/cart');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(1, sizeof($responseData["products"]));
    }

    /**
    * @depends testAddProduct
    */
    public function testAddToMuchProductToCart($id): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', "/api/cart/{$id}", ["quantity" => "100"]);
        $response = $client->getResponse();
        $this->assertEquals(json_encode(["error" => "too many"]), $response->getContent());
    }

    /**
    * @depends testAddProduct
    */
    public function testDeleteProductFromCart($id): void
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', "/api/cart/{$id}");
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(0, sizeof($responseData["products"]));
    }

    public function testCartAfterDeleteingProduct(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/cart');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(0, sizeof($responseData["products"]));
    }

    /**
    * @depends testAddProduct
    */
    public function testDeleteProduct($id): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('DELETE', "/api/products/{$id}");
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['delete' => 'ok'], $responseData);
    }

    public function testGetAllProductsAfterDeletion(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(20, sizeof($responseData));
    }
}
