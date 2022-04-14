<?php

namespace App\Tests;

use App\Model\RickAndMortyModel;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;

class RickAndMortyApiTest extends WebTestCase
{
    private $mockedData;

    public function testApiRickAndMorty(): void
    {

        $mockData = [
            "results" => [
                [
                    "name" => "Rick Sanchez",
                    "image" => "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                ],
                [
                    "name" => "Alien Morty",
                    "image" => "https://rickandmortyapi.com/api/character/avatar/14.jpeg"
                ]
            ]
        ];

        $mock = new MockHandler([
            new Response(200, ["Content-Type" => "application/json"], json_encode($mockData))
        ]);

        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]);

        $response = $client->request(
            'GET',
            'https://rickandmortyapi.com/api/character'
        );

        $this->assertEquals(200, $response->getStatusCode());
        $responseData = json_decode($response->getBody(), true);
        $this->assertEquals($mockData, $responseData);
        
        $this->mockedData = $mockData;
    }
}
