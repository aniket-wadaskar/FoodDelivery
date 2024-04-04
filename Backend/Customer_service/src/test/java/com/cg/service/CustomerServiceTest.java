package com.cg.service;
 
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertThrows;

import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.times;

import static org.mockito.Mockito.verify;

import static org.mockito.Mockito.when;
 
import java.util.ArrayList;

import java.util.List;

import java.util.Optional;
 
import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;

import org.mockito.Mock;

import org.mockito.MockitoAnnotations;
 
import com.cg.dto.CustomerDTO;

import com.cg.entity.Customer;

import com.cg.exception.CustomerNotFoundException;

import com.cg.repository.CustomerRepository;

import com.cg.serviceImpl.CustomerServiceImplementation;
 
class CustomerServiceTest {
 
    @Mock

    private CustomerRepository customerRepository;
 
    @InjectMocks

    private CustomerServiceImplementation customerService;
 
    @BeforeEach

    void setUp() {

        MockitoAnnotations.openMocks(this);

    }
 
    @Test

    void testRegisterCustomer() {

        Customer customer = new Customer();

        customer.setUsername("John");

        customer.setEmail("john@example.com");

        customer.setNumber(1234567890);

        customer.setAddress("123 Street, City");
 
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);
 
        Customer registeredCustomer = customerService.registerCustomer(customer);
 
        assertEquals("John", registeredCustomer.getUsername());

        assertEquals("john@example.com", registeredCustomer.getEmail());

        assertEquals(1234567890, registeredCustomer.getNumber());

        assertEquals("123 Street, City", registeredCustomer.getAddress());
 
        verify(customerRepository, times(1)).save(any(Customer.class));

    }
 
    @Test

    void testReadAllCustomers() {

        List<Customer> customers = new ArrayList<>();

        customers.add(new Customer());

        customers.add(new Customer());
 
        when(customerRepository.findAll()).thenReturn(customers);
 
        List<CustomerDTO> customerDTOs = customerService.readAllCustomers();
 
        assertEquals(2, customerDTOs.size());
 
        verify(customerRepository, times(1)).findAll();

    }
 
    @Test

    void testUpdateCustomer() {

        int id = 1;

        Customer existingCustomer = new Customer();

        existingCustomer.setId(id);

        existingCustomer.setUsername("Existing");

        existingCustomer.setEmail("existing@example.com");

        existingCustomer.setNumber(1234567890);

        existingCustomer.setAddress("Existing Address");
 
        Customer updatedCustomer = new Customer();

        updatedCustomer.setId(id);

        updatedCustomer.setUsername("Updated");

        updatedCustomer.setEmail("updated@example.com");

        updatedCustomer.setNumber(987654321);

        updatedCustomer.setAddress("Updated Address");
 
        when(customerRepository.findById(id)).thenReturn(Optional.of(existingCustomer));

        when(customerRepository.save(any(Customer.class))).thenReturn(updatedCustomer);
 
        String result = customerService.updateCustomer(id, updatedCustomer);
 
        assertEquals("Customer Updated Successfully", result);

        assertEquals("Updated", existingCustomer.getUsername());

        assertEquals("updated@example.com", existingCustomer.getEmail());

        assertEquals(987654321, existingCustomer.getNumber());

        assertEquals("Updated Address", existingCustomer.getAddress());
 
        verify(customerRepository, times(1)).findById(id);

        verify(customerRepository, times(1)).save(any(Customer.class));

    }
 
    @Test

    void testDeleteCustomer() {

        int id = 1;

        Customer existingCustomer = new Customer();

        existingCustomer.setId(id);
 
        when(customerRepository.findById(id)).thenReturn(Optional.of(existingCustomer));
 
        String result = customerService.deleteCustomer(id);
 
        assertEquals("Customer deleted successfully.", result);
 
        verify(customerRepository, times(1)).findById(id);

        verify(customerRepository, times(1)).deleteById(id);

    }
 
    @Test

    void testGetByEmail() throws CustomerNotFoundException {

        String email = "test@example.com";

        List<Customer> customers = new ArrayList<>();

        customers.add(new Customer());

        customers.add(new Customer());
 
        when(customerRepository.findByEmail(email)).thenReturn(customers);
 
        assertThrows(CustomerNotFoundException.class, () -> customerService.getByEmail("invalid@example.com"));
 
        List<CustomerDTO> customerDTOs = customerService.getByEmail(email);
 
        assertEquals(2, customerDTOs.size());
 
        verify(customerRepository, times(1)).findByEmail(email);

    }
 
    @Test

    void testGetCustomerById() throws CustomerNotFoundException {

        int id = 1;

        Customer customer = new Customer();

        customer.setId(id);

        customer.setUsername("Test");

        customer.setEmail("test@example.com");
 
        when(customerRepository.findById(id)).thenReturn(Optional.of(customer));
 
    //    assertThrows(CustomerNotFoundException.class, () -> customerService.getCustomerById(1));
 
        CustomerDTO customerDTO = customerService.getCustomerById(id);
 
        assertEquals("Test", customerDTO.getUsername());

        assertEquals("test@example.com", customerDTO.getEmail());
 
        verify(customerRepository, times(1)).findById(id);

    }

}

