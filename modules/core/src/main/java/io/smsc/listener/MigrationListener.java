package io.smsc.listener;

import io.smsc.service.MigrationService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

@Component
public class MigrationListener implements ApplicationListener<ContextRefreshedEvent>, Ordered {
    private static Logger log = Logger.getLogger(MigrationListener.class);

    @Autowired
    private MigrationService migrationService;

	@EventListener({ContextRefreshedEvent.class})
	public void onApplicationEvent(ContextRefreshedEvent contextEvent) {
        log.info("Start migration!");
        migrationService.upgradeDatabase();
        log.info("Migration finish!");
	}

	@Override
	public int getOrder() {
		return 0;
	}
}