<?php

abstract class Employee
{
    protected $firstName;
    protected $lastName;
    protected $hireDate;
    protected $baseSalary;

    public function __construct($firstName, $lastName, $hireDate, $baseSalary)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->hireDate = $hireDate;
        $this->baseSalary = $baseSalary;
    }

    public function seniority()
    {
        return floor((time() - strtotime($this->hireDate)) / (365.25 * 86400));
    }

    abstract public function calculateSalary();
}


class Developer extends Employee
{
    public function calculateSalary()
    {
        $total = $this->baseSalary + ($this->seniority() * 500);

        if ($this->seniority() > 5) {
            $total += $this->baseSalary * 0.10;
        }

        return $total;
    }
}


class Salesperson extends Employee
{
    private $monthlySales;
    private $commission;

    public function __construct($firstName, $lastName, $hireDate, $baseSalary, $monthlySales, $commission)
    {
        parent::__construct($firstName, $lastName, $hireDate, $baseSalary);
        $this->monthlySales = $monthlySales;
        $this->commission = $commission;
    }

    public function calculateSalary()
    {
        return $this->baseSalary + ($this->monthlySales * $this->commission / 100);
    }
}


class Manager extends Employee
{
    private $teamSize;

    public function __construct($firstName, $lastName, $hireDate, $baseSalary, $teamSize)
    {
        parent::__construct($firstName, $lastName, $hireDate, $baseSalary);
        $this->teamSize = $teamSize;
    }

    public function calculateSalary()
    {
        $total = $this->baseSalary + ($this->teamSize * 200);

        if ($this->teamSize > 10) {
            $total += $total * 0.15;
        }

        return $total;
    }
}