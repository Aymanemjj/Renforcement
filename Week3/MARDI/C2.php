<?php

class Cinema
{
    private $salles = [];

    public function ajouterSalle($nom, $nbPlaces)
    {
        $this->salles[$nom] = [
            'places' => $nbPlaces,
            'reservations' => []
        ];
    }

    public function reserver($nomSalle, $nomClient, $nbPlaces)
    {
        if (!isset($this->salles[$nomSalle])) {
            echo "Room '$nomSalle' not found.\n";
            return;
        }

        $salle = &$this->salles[$nomSalle];
        $available = $salle['places'] - $this->reservedSeats($nomSalle);

        if ($nbPlaces > $available) {
            echo "Not enough seats: only $available available in '$nomSalle'.\n";
            return;
        }

        $salle['reservations'][$nomClient] = $nbPlaces;
        echo "$nomClient reserved $nbPlaces seats in '$nomSalle'.\n";
    }

    public function cancelReservation($nomSalle, $nomClient)
    {
        if (!isset($this->salles[$nomSalle]['reservations'][$nomClient])) {
            echo "No reservation found for '$nomClient' in '$nomSalle'.\n";
            return;
        }

        unset($this->salles[$nomSalle]['reservations'][$nomClient]);
        echo "$nomClient's reservation cancelled in '$nomSalle'.\n";
    }

    public function displayOccupancy()
    {
        echo "Room Occupancy \n";
        foreach ($this->salles as $name => $salle) {
            $taken = $this->reservedSeats($name);
            $total = $salle['places'];
            $percent = round($taken / $total * 100);
            echo "$name: $taken/$total seats ($percent%)\n";
        }
        echo "\n";
    }

    public function getEstimatedRevenue($ticketPrice)
    {
        $total = 0;
        foreach ($this->salles as $name => $salle) {
            $total += $this->reservedSeats($name) * $ticketPrice;
        }
        return $total;
    }

    private function reservedSeats($nomSalle)
    {
        return array_sum($this->salles[$nomSalle]['reservations']);
    }
}


