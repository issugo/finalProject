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

    public function testProducts(): void
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertEquals(20, sizeof(json_decode($response->getContent())));
    }

    public function testAddProductToCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/3', ["quantity" => "1"]);
        $response = $client->getResponse();
        $this->assertEquals(1, sizeof(json_decode($response)["products"]));
        $this->assertEquals(3, json_decode($response)["products"][0]["quantity"]);
    }

    public function testAddToMuchProductToCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/3', ["quantity" => "30"]);
        $response = $client->getResponse();
        $this->assertEquals(json_encode(["error" => "too many"]), $response->getContent());
    }
}
