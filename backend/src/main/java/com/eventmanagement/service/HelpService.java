package com.eventmanagement.service;

import com.eventmanagement.repository.HelpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelpService {

    @Autowired
    private HelpRepository helpRepository;

    // TODO (Kokilaveni): createHelp, editText, deleteHelp
}