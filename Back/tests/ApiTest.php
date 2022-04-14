<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{
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

    public function testGetAllProducts(): void
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

    public function testAddProduct(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/products', [
            "name" => "voila",
            "price" => 100,
            "quantity" => 50,
            "image" => "test image"
        ]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals("voila", $responseData["name"]);
        $this->assertEquals(100, $responseData["price"]);
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
        $this->assertEquals(21, sizeof($responseData));
        $this->assertEquals("voila", $responseData[20]["name"]);
    }

    public function testGetOneProduct(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products/21');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals("voila", $responseData["name"]);
        $this->assertEquals(100, $responseData["price"]);
    }

    public function testDeleteProduct(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('DELETE', '/api/products/21');
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
        $this->assertNotEquals("voila", $responseData[20]["name"]);
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
        $this->assertEquals(0, sizeof($responseData["products"]));
    }

    public function testAddProductToCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/3', ["quantity" => "1"]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(1, sizeof($responseData["products"]));
        //$this->assertEquals(1, $responseData["products"][0]["quantity"]);
    }

    public function testCartAfterAddingProduct(): void
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
        $client->jsonRequest('POST', '/api/cart/3', ["quantity" => "100"]);
        $response = $client->getResponse();
        $this->assertEquals(json_encode(["error" => "too many"]), $response->getContent());
    }

    public function testDeleteProductFromCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', '/api/cart/3');
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
}
