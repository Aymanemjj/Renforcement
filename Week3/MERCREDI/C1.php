<?php

abstract class Transport
{
    protected $name;
    protected $maxSpeed;
    protected $passengers;
    protected $consumption;

    public function __construct($name, $maxSpeed, $passengers, $consumption)
    {
        $this->name = $name;
        $this->maxSpeed = $maxSpeed;
        $this->passengers = $passengers;
        $this->consumption = $consumption;
    }

    public function travelTime($distance)
    {
        return $distance / $this->maxSpeed;
    }

    abstract public function travelCost($distance);
}


class Car extends Transport
{
    private $fuelPrice = 1.8;

    public function __construct($passengers)
    {
        parent::__construct('Car', 130, $passengers, 7);
    }

    public function travelCost($distance)
    {
        $total = ($distance / 100) * $this->consumption * $this->fuelPrice;
        return $total / $this->passengers;
    }
}


class Train extends Transport
{
    private $electricityPrice = 0.15;

    public function __construct($passengers)
    {
        parent::__construct('Train', 300, $passengers, 30);
    }

    public function travelCost($distance)
    {
        $total = ($distance / 100) * $this->consumption * $this->electricityPrice;
        return $total / $this->passengers;
    }
}


class Plane extends Transport
{
    private $planeFuel = 2.5;

    public function __construct($passengers)
    {
        parent::__construct('Plane', 900, $passengers, 250);
    }

    public function travelCost($distance)
    {
        $total = ($distance / 100) * $this->consumption * $this->planeFuel;
        return $total / $this->passengers;
    }
}


