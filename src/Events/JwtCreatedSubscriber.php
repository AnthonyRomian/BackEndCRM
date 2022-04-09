<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Security;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1. Récupérer l'utilisateur (pour avoir son firstName et lastName)
        $user = $event->getUser();

        // 2. Enrichir les data pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();

        $event->setData($data);
    }
}
