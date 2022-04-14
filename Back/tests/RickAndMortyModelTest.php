<?php

namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Model\RickAndMortyModel;

class RickAndMortyModelTest extends TestCase {

    public function testRickAndMortyModel(): void
    {
        $test = new RickAndMortyModel();
        $this->assertEquals("", $test->getName());
        $this->assertEquals("", $test->getImage());

        $test->setName("voila");
        $this->assertEquals("voila", $test->getName());

        $test->setImage("test.png");
        $this->assertEquals("test.png", $test->getImage());
    }

}