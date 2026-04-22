<?php

abstract class Article
{
    protected $reference;
    protected $name;
    protected $priceHT;

    public function __construct($reference, $name, $priceHT)
    {
        $this->reference = $reference;
        $this->name = $name;
        $this->priceHT = $priceHT;
    }

    abstract public function calculatePriceTTC();
    abstract public function getTVA();

    public function getPriceHT()
    {
        return $this->priceHT;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getReference()
    {
        return $this->reference;
    }
}


class Product extends Article
{
    public function getTVA()
    {
        return 20;
    }

    public function calculatePriceTTC()
    {
        return $this->priceHT * 1.20;
    }
}


class Service extends Article
{
    public function getTVA()
    {
        return 10;
    }

    public function calculatePriceTTC()
    {
        return $this->priceHT * 1.10;
    }
}


class FoodProduct extends Article
{
    public function getTVA()
    {
        return 5.5;
    }

    public function calculatePriceTTC()
    {
        return $this->priceHT * 1.055;
    }
}


class Invoice
{
    private $number;
    private $date;
    private $client;
    private $lines = [];

    public function __construct($number, $date, $client)
    {
        $this->number = $number;
        $this->date = $date;
        $this->client = $client;
    }

    public function addLine($article, $quantity)
    {
        $this->lines[] = ['article' => $article, 'quantity' => $quantity];
    }

    public function totalHT()
    {
        $total = 0;
        foreach ($this->lines as $line) {
            $total += $line['article']->getPriceHT() * $line['quantity'];
        }
        return $total;
    }

    public function totalTVA()
    {
        $total = 0;
        foreach ($this->lines as $line) {
            $ht = $line['article']->getPriceHT() * $line['quantity'];
            $total += $ht * $line['article']->getTVA() / 100;
        }
        return $total;
    }

    public function totalTTC()
    {
        return $this->totalHT() + $this->totalTVA();
    }

    public function display()
    {
        echo "Invoice " . $this->number . " - " . $this->date . " - " . $this->client . "\n";

        $tvaByRate = [];

        foreach ($this->lines as $line) {
            $article = $line['article'];
            $qty = $line['quantity'];
            $totalHT = $article->getPriceHT() * $qty;
            $rate = $article->getVAT();

            echo $article->getName() . " x" . $qty . " — " . number_format($totalHT, 2) . "$ (TVA " . $rate . "%)\n";

            if (!isset($tvaByRate[$rate])) {
                $tvaByRate[$rate] = 0;
            }
            $tvaByRate[$rate] += $totalHT * $rate / 100;
        }

        echo "Total HT:  $" . number_format($this->totalHT(), 2) . "\n";

        foreach ($tvaByRate as $rate => $amount) {
            echo "TVA " . $rate . "%: " . number_format($amount, 2) . "$\n";
        }

        echo "Total VAT: $" . number_format($this->totalTVA(), 2) . "\n";
        echo "Total TTC: $" . number_format($this->totalTTC(), 2) . "\n";
    }
}
