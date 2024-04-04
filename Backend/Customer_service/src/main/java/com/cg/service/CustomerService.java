package com.cg.service;

import java.util.List;

import com.cg.dto.CustomerDTO;
import com.cg.entity.Customer;
import com.cg.exception.CustomerNotFoundException;


public interface CustomerService {

	public Customer registerCustomer(Customer customer);

	public String updateCustomer(int id, Customer customer);

	public String deleteCustomer(int id);

	public List<CustomerDTO> getByEmail(String email) throws CustomerNotFoundException;

	public CustomerDTO getCustomerById(int id) throws CustomerNotFoundException;
	
	public List<CustomerDTO> readAllCustomers();
}
