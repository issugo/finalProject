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

    public function testAddProduct(): void
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
        $this->id = $responseData["id"];
    }

    public function testGetAllProductsAfterAddingOne(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(1, sizeof($responseData));
        $this->assertEquals("rick", $responseData[$this->id - 1]["name"]);
    }

    public function testGetOneProduct(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products/' . $this->id);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals("rick", $responseData["name"]);
        $this->assertEquals(8, $responseData["price"]);
    }

    public function testAddProductToCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/' . $this->id, ["quantity" => "2"]);
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

    public function testAddToMuchProductToCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/' . $this->id, ["quantity" => "100"]);
        $response = $client->getResponse();
        $this->assertEquals(json_encode(["error" => "too many"]), $response->getContent());
    }

    public function testDeleteProductFromCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', '/api/cart/' . $this->id);
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
    public function testDeleteProduct(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('DELETE', '/api/products/' . $this->id);
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
        $this->assertEquals(0, sizeof($responseData));
    }
}
