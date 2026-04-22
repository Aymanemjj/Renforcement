<?php

class Distributor
{
    private array $products;
    private float $cash = 0.0;

    public function __construct(array $products)
    {
        $this->products = $products;
    }

    public function displayProducts()
    {
        echo "\n=== Available Products ===\n";
        foreach ($this->products as $product) {
            $stock = $product['stock'] > 0
                ? "{$product['stock']} in stock"
                : "OUT OF STOCK";
            echo "  " . $product['name'] . "$" . number_format($product['price'], 2) . "  ($stock)\n";
        }
        echo "\n";
    }

    public function buy( $productName,  $amountInserted)
    {
        $index = $this->findProduct($productName);

        if ($index === null) {
            echo "Error product '$productName' not found.\n";
            return $amountInserted;
        }

        $product = &$this->products[$index];

        if ($product['stock'] <= 0) {
            echo " '$productName' is unavailable.";
            return $amountInserted;
        }

        if ($amountInserted < $product['price']) {
            printf(
                "Need \$%.2f, got \$%.2f. \$%.2f returned.\n",
                $product['price'],
                $amountInserted,
                $amountInserted
            );
            return $amountInserted;
        }

        $rest = round($amountInserted - $product['price'], 2);
        $product['stock']--;
        $this->cash += $product['price'];

        printf(
            "Dispensing $productName, Change: \$%.2f\n",
            $rest
        );
        return $rest;
    }


    public function refill( $productName,  $quantity)
    {
        $index = $this->findProduct($productName);

        if ($index === null) {
            echo "Cannot refill $productName not found\n";
            return;
        }

        $this->products[$index]['stock'] += $quantity;
        $newStock = $this->products[$index]['stock'];
        echo "$productName restocked. New stock: $newStock.\n";
    }

    public function getRevenue(): float
    {
        return $this->cash;
    }

    private function findProduct(string $name)
    {
        foreach ($this->products as $i => $product) {
            if ($product['name'] === $name) {
                return $i;
            }
        }
        return null;
    }
}




