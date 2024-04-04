package com.cg.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="DeliveryPartnerService",url = "http://localhost:8094" )
public interface DeliveryPartnerService {

    @GetMapping("/deliveryPartner/assign")
    public int assignDeliveryPartner();
    
    @GetMapping("/deliveryPartner/unassign/{id}")
    public void unAssignDeliveryPartner(@PathVariable("id") int id) ;
}
