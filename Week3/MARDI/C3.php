<?php

class Bibliotheque
{
    private $books = [];
    private $reservations = [];

    public function ajouterLivre($title, $author)
    {
        $this->books[$title] = [
            'author' => $author,
            'available' => true
        ];
    }

    public function emprunter($title, $reserver)
    {
        if (!isset($this->books[$title])) {
            echo "Book '$title' not found.\n";
            return;
        }

        if (!$this->books[$title]['available']) {
            echo "'$title' is already borrowed.\n";
            return;
        }

        $this->books[$title]['available'] = false;

        $this->reservations[] = [
            'title'               => $title,
            'reserver'          => $reserver,
            'reservation_date'        => time(),
            'estimated_return_date'  => time() + (14 * 24 * 60 * 60),
            'actuale_return_date' => null,
            'tax'              => 0
        ];

        echo "$reserver borrowed '$title' (due in 14 days).\n";
    }

    public function retourner($title, $returnDate = null)
    {
        $index = $this->findEmprunt($title);

        if ($index === null) {
            echo "No active loan found for '$title'.\n";
            return;
        }

        $reservation = &$this->reservations[$index];
        $return = $returnDate ?? time();

        $delay = floor(($return - $reservation['estimated_return_date']) / 86400);
        $tax = $delay > 0 ? $delay * 0.50 : 0;

        $reservation['actuale_return_date'] = $return;
        $reservation['tax'] = $tax;

        $this->books[$title]['available'] = true;

        if ($tax > 0) {
            echo "'" . $title . "' returned by " . $reservation['reserver'] . " — $delay days late. Fine: $" . $tax . "\n";
        } else {
            echo "'" . $title . "' returned by " . $reservation['reserver'] . " on time.\n";
        }
    }

    public function getAmendes($reserver)
    {
        $total = 0;
        foreach ($this->reservations as $reservation) {
            if ($reservation['reserver'] === $reserver) {
                $total += $reservation['tax'];
            }
        }
        return $total;
    }

    public function getStatistiques()
    {
        $availables = 0;
        $reservs = 0;
        foreach ($this->books as $livre) {
            if ($livre['available']) {
                $availables++;
            } else {
                $reservs++;
            }
        }

        $totalTax = 0;
        foreach ($this->reservations as $reservation) {
            $totalTax += $reservation['tax'];
        }

        $delays = [];
        foreach ($this->reservations as $reservation) {
            $name = $reservation['reserver'];
            if (!isset($delays[$name])) {
                $delays[$name] = 0;
            }
            $delays[$name] += $reservation['tax'];
        }


        $longestDelay = null;
        $max = 0;
        foreach ($delays as $name => $fine) {
            if ($fine > $max) {
                $max = $fine;
                $longestDelay = $name;
            }
        }

        echo "Statistics";
        echo "Available books: $availables\n";
        echo "Borrowed books: $reservs\n";
        echo "Total fines collected: " . $totalTax . "$\n";
        echo "Most fined borrower: " . ($longestDelay ?? "none") . "\n";
    }

    private function findEmprunt($title)
    {
        foreach ($this->reservations as $i => $reservation) {
            if ($reservation['title'] === $title && $reservation['date_retour_effectif'] === null) {
                return $i;
            }
        }
        return null;
    }
}
